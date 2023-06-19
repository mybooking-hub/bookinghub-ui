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

const useMapFilterData = <T>(dataMap: QuerySnapshot<DocumentData> | undefined, ids: string[]) => {
    if (!dataMap) return {}
    const mappedData: T[] | undefined = dataMap?.docs.map((d: QueryDocumentSnapshot<DocumentData>) => {
        if (ids.includes(d.id)) {
            return {
                _id: d.id,
                ...d.data()
            } as T
        }
        return null
    }).filter((item): item is T => item !== null);

    return {
        mapFilteredData: mappedData
    }
}

export {
    useMapData,
    useMapFilterData
}