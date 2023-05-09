import toast from 'react-hot-toast'
import { BsFillExclamationTriangleFill } from 'react-icons/bs'

export function warningToast(message: string) {
	return toast(message, {
		icon: <BsFillExclamationTriangleFill className="w-5 h-5 fill-yellow-500" />
	})
}

export function successToast(message: string) {
	return toast.success(message)
}

export function errorToast(message: string) {
	return toast.error(message)
}
