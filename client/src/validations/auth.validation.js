import * as Yup from 'yup'

export const registerInitialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export const registerValidation = Yup.object({
  username: Yup.string().required('Username harus diisi'),
  email: Yup.string().required('Email harus diisi').email('Format email tidak valid'),
  password: Yup.string()
    .required('Kata sandi harus diisi')
    .min(8, 'Harus lebih dari 8 karakter')
    .matches(/[a-z]/g, 'Harus mengandung setidaknya 1 huruf kecil')
    .matches(/[A-Z]/g, 'Harus mengandung setidaknya 1 huruf besar')
    .matches(/[0-9]/g, 'Harus mengandung setidaknya 1 angka')
    .matches(/^\S*$/g, 'Tidak boleh mengandung spasi'),
  confirmPassword: Yup.string()
    .required('Konfirmasi kata sandi harus diisi')
    .oneOf([Yup.ref('password')], 'Kata sandi harus cocok')
})

export const loginInitialValues = {
  email: '',
  password: ''
}

export const loginValidation = Yup.object({
  email: Yup.string().required('Email harus diisi').email('Format email tidak valid'),
  password: Yup.string().required('Kata sandi harus diisi')
})
