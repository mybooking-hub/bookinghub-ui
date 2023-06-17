import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

import { firebaseDB } from "hooks/useFirebase";

export interface PerformanceResponse {
    _id: string,
    name: string,
    genre: {
        id: string,
        label: string
    }[],
    ratings: number,
    synopsis: string | '',
    poster: string | undefined | '',
    date: {
        seconds: number,
        nanoseconds: number
    }
    theatreId: string,
    price: number,
}

const useGetAllPerformance = () => {
    const collectionRef = collection(firebaseDB, "performances");

    return useQuery({
        queryKey: ["getPerformnace"],
        queryFn: () => getDocs(collectionRef),
        refetchOnWindowFocus: false
    });
}

const useGetPerformance = (id: string) => {
    const singleDocRef = doc(firebaseDB, "performances", id);

    return useQuery({
        queryKey: ["getOnePerformance"],
        queryFn: () => getDoc(singleDocRef),
        refetchOnWindowFocus: false
    });
}

export {
    useGetAllPerformance,
    useGetPerformance
}