import { saveAs } from 'file-saver'
import JSZip from 'jszip'

import CONFIG from '../constants/environtment'

export const downloadPost = async (question) => {
  const data = question.data?.images.map((image) => {
    return fetch(CONFIG.imageUrl + image).then((res) => res.blob())
  })
  const blob = await Promise.all(data)
  const zip = new JSZip()
  blob.forEach((blob, index) => {
    zip.file(`${question.data?.mataKuliah}-${index}.jpg`, blob)
  })
  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, `${question.data?.mataKuliah}.zip`)
  })
}
