import supabase, { supabaseUrl } from './supabase'

export const getCabins = async () => {
  let { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.log(error)
    throw new Error('Cabins could not be loaded')
  }

  return data
}

export const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '')

  // If cabin has image path, use that path, otherwise use the image name
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // 1. Create/edit cabin
  let query = supabase.from('cabins')

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }])
  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id)

  const { data, error } = await query.select().single()

  if (error) {
    console.log(error)
    throw new Error('Something went wrong ')
  }

  // 2. Upload Image
  if (hasImagePath) return data

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
