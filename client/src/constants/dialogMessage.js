export const dangerMsg = (type, title) => {
  return {
    title: `${type} ${title}`,
    content: `Apakah Anda yakin ingin ${type} ${title} ini? ${title} ini akan di${type} ${
      type === 'hapus' ? 'secara permanen' : 'kepada admin'
    }. Tindakan ini tidak dapat dibatalkan.`,
    buttonText: type,
    variant: 'danger'
  }
}

export const successReportMsg = (title) => {
  return {
    title: 'Laporan Anda berhasil dikirim',
    text: `Laporan Anda berhasil kami terima. Kami akan memberi tahu pemilik ${title} atas laporan yang Anda berikan. Terima kasih atas laporannya.`
  }
}
