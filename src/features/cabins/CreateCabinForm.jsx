import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { createEditCabin } from '../../services/apiCabins'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Textarea from '../../ui/Textarea'

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId)

  // if used for editcabin use given values as default values
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  })
  const { errors } = formState

  const quearyClient = useQueryClient()

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created!')
      quearyClient.invalidateQueries({ queryKey: ['cabins'] })
      reset()
    },
    onError: (error) => toast.error(error.message),
  })

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('New cabin successfully edited!')
      quearyClient.invalidateQueries({ queryKey: ['cabins'] })
      reset()
    },
    onError: (error) => toast.error(error.message),
  })

  const isWorking = isCreating || isEditing

  function onSubmit(data) {
    const image = typeof data.image == 'string' ? data.image : data.image[0]
    if (isEditSession) {
      editCabin({ newCabinData: { ...data, image }, id: editId })
    } else {
      createCabin({ ...data, image })
    }
  }

  function onError(errors) {
    console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Minimum capacity is 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              Number(value) <= getValues().regularPrice ||
              `Discount should be lower than regular price: ${
                getValues().regularPrice
              }`,
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}>
        <Textarea
          {...register('description', {
            required: 'This field is required',
          })}
          type='number'
          id='description'
          defaultValue=''
        />
      </FormRow>

      <FormRow label='Cabin Photo'>
        <FileInput
          id='image'
          accept='image/*'
          type='file'
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Update cabin' : 'Create cabin'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
