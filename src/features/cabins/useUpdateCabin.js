import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { createEditCabin } from '../../services/apiCabins'

export function useUpdateCabin() {
  const quearyClient = useQueryClient()

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('New cabin successfully edited!')
      quearyClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: (error) => toast.error(error.message),
  })

  return { editCabin, isEditing }
}
