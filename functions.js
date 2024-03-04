export const get_id_from_message = async (text) => {
  const regex = /\[id(\d+)\|/
  const match = text.match(regex)

  if (match) return parseInt(match[1])
  else return undefined
}