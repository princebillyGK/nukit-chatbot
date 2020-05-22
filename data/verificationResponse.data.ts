import { VerficationResponseData, VerficationResponseDataSet, } from '../types/types'

const VERFICATIONRESPONSEDATA: VerficationResponseDataSet = {
    approved: (id: string, token: string): VerficationResponseData => ({
        title: 'Approve Request',
        icon: 'check',
        color: 'success',
        primaryText: `Note with ID ${id} has been successfully approved`,
        secondaryText: `Token: ${token} is now expired`
    }),
    rejected: (id: string, token: string): VerficationResponseData => ({
        title: 'Reject Request',
        icon: 'cross',
        color: 'error',
        primaryText: `Note with ID ${id} has been successfully rejected`,
        secondaryText: `Token: ${token} is now expired`
    }),
    invalidLink: () => ({
        title: 'Invalid Link',
        icon: 'flag',
        color: 'gray',
        primaryText: 'The link is invalid',
        secondaryText: 'Please check if your link is correct'
    }),
    noteNotFound: (id:string) => ({
        title: "Note not found",
        icon: 'flag',
        color: 'warning',
        primaryText: `No note found with ID ${id}`,
        secondaryText: 'Try again with a valid ID and token'
    }),
    expiredToken: (time:string) => ({
        title: "Forbidden Access",
        icon: 'delete',
        color: 'warning',
        primaryText: 'Token is expired',
        secondaryText: `The file is already verifed at ${time}`
    }),
    invalidToken: () => ({
        title: "Forbidden Access",
        icon: 'stop',
        color: 'warning',
        primaryText: 'The verification token is invalid',
        secondaryText: 'You do not have permission'
    })
}
export { VERFICATIONRESPONSEDATA };