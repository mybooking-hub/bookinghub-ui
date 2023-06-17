import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore"

const useMapData = <T>(dataMap: QuerySnapshot<DocumentData> | undefined) => {
    if (!dataMap) return {}
    const mappedData: T[] | undefined = dataMap?.docs.map((d: QueryDocumentSnapshot<DocumentData>) => ({
        _id: d.id,
        ...d.data()
    } as T))

    return {
        mappedData
    }
}

export {
    useMapData
}