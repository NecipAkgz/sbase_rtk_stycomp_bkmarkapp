import supabase, { supabaseUrl } from './supabase'

export const getCabins = async () => {
  let { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.log(error)
    throw new Error('Cabins could not be loaded')
  }

  return data
}

export const createCabin = async (newCabin) => {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '')
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // 1. Create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])

  if (error) {
    console.log(error)
    throw new Error('Something went wrong ')
  }

  // 2. Upload Image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  // 3. Delete cabin if there was a error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().q('id', data.id)
    throw new Error(
      'Cabin image could not be uploaded and the cabin as not created'
    )
  }

  return data
}

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    console.log(error)
    throw new Error('Cabins not found')
  }

  return data
}
