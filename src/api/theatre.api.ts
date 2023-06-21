import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

import { firebaseDB } from "hooks/useFirebase";

export interface TheatreResponse {
    _id: string,
    capacity: number,
    name: string,
    seatPlan: Record<string, number>
}

const useGetAllTheatre = () => {
    const collectionRef = collection(firebaseDB, 'theatres');

    return useQuery({
        queryKey: ["getTheatre"],
        queryFn: () => getDocs(collectionRef),
        refetchOnWindowFocus: false,
        // enabled: false
    })
}

// const useGetFilteredTheatre = (ids: string[]) => {
//     const collectionRef = collection(firebaseDB, 'theatres');
//     const myQuery = query(collectionRef, where("id", "==", ids));

//     return useQuery({
//         queryKey: ["getFilteredTheatre"],
//         queryFn: () => getDocs(myQuery),
//         refetchOnWindowFocus: false,
//         enabled: false
//     })
// }

const useGetTheatre = (ids: string) => {
    const singleTheatre = doc(firebaseDB, "theares", ids);

    return useQuery({
        queryKey: ["getOneTheatre"],
        queryFn: () => getDoc(singleTheatre),
        refetchOnWindowFocus: false
    })
}

export {
    useGetAllTheatre,
    // useGetFilteredTheatre,
    useGetTheatre
}