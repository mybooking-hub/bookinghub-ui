import { DocumentData, DocumentSnapshot } from "firebase/firestore"

const useExtractData = <T>(dataExtract: DocumentSnapshot<DocumentData> | undefined) => {
    if (!dataExtract) return {}
    const mappedData = {
        _id: dataExtract?.id,
        ...dataExtract?.data()
    } as T

    return {
        mappedData
    }
}

export {
    useExtractData
}