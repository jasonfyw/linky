import { ReactNode } from "react"

interface ToastProps {
    toast: (c: Object) => void,
    desc?: string | ReactNode
}

export const copySuccessToast = (props: ToastProps) => {
    props.toast({
        title: 'Shortened link copied to clipboard!',
        description: props.desc,
        status: 'success',
        duration: 2000,
        isClosable: true,
        variant: 'subtle',
        position: 'bottom-left'
    })
}

export const errorToast = (props: ToastProps) => {
    props.toast({
        title: 'An error occurred. Please try again',
        description: props.desc,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom-left'
    })
}

export const deleteLinkToast = (props: ToastProps) => {
    props.toast({
        title: 'Link deleted',
        status: 'info',
        duration: 2000,
        isClosable: true,
        variant: 'subtle',
        position: 'bottom-left'
    })
}

export const clearLinksToast = (props: ToastProps) => {
    props.toast({
        title: 'All links cleared',
        status: 'info',
        duration: 2000,
        isClosable: true,
        variant: 'subtle',
        position: 'bottom-left'
    })
}
