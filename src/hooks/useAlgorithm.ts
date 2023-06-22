export default function useAlgorithm(
    // theatreSeat: { [key: string]: number }[],
    // seatPlan: { [key: string]: number[] },
    // seatStatus: { [key: string]: number[] },
    // requestedSeats: string[]
) {
    // theatreSeat prop include data like [{A: 10}, {B: 10}, {C: 10}, {D: 10}, {E: 10}]
    // seatPlan prop include data like {A: [1,2,3,4,5,6,7,8,9,10], B: [1,2,3,4,5,6,7,8,9,10], C: [1,2,3,4,5,6,7,8,9,10], D: [1,2,3,4,5,6,7,8,9,10], E: [1,2,3,4,5,6,7,8,9,10]}
    // seatStatus prop include data like {A: [1,2,3,4,5,6,7,8,9,10], B: [1,2,3,4,5,6,7,8,9,10], C: [1,2,3,4,5,6,7,8,9,10], D: [1,2,3,4,5,6,7,8,9,10], E: [1,2,3,4,5,6,7,8,9,10]}
    // requestedSeats prop include data like ["A10", "B5"]


    // A function to check if requested seats are available or not based on seatStatus and requestedSeatRows and requestedSeatColumns
    const checkRequestedSeats = (requestedSeats: string[], seatStatus: { [key: string]: number[] }) => {
        // Requested seat rows without repetition
        const requestedSeatRows: string[] = [...new Set(requestedSeats.map((seat) => seat[0]))];

        // Requested seat columns as per row: { A: [10], B: [5] }
        const requestedSeatColumns: { [key: string]: number[] } = {
            ...requestedSeats.reduce((acc: any, seat) => {
                const row = seat[0];
                const column = parseInt(seat.slice(1));
                return {
                    ...acc,
                    [row]: [...(acc[row] || []), column]
                }
            }, {})
        };

        const requestedSeatsStatus: { [key: string]: boolean } = {};
        requestedSeatRows.forEach((row: any) => {
            requestedSeatsStatus[row] = requestedSeatColumns[row].every((column) => {
                if (seatStatus[row] === undefined) {
                    return true;
                }
                return !seatStatus[row].includes(column);
            })
        })
        const allFlag = Object.values(requestedSeatsStatus).every((flag) => flag === true);
        return {
            allFlag,
            requestedSeatsStatus
        };
    };

    // Calculate the remaining seats after requested seats from seatPlan also check if rqeuested seats are already there in seatStatus which indicates already booked
    const remainingSeats = (requestedSeats: string[], seatStatus: { [key: string]: number[] }, seatPlan: { [key: string]: number[] }) => {
        // Requested seat rows without repetition
        const requestedSeatRows: string[] = [...new Set(requestedSeats.map((seat) => seat[0]))];

        // Requested seat columns as per row: { A: [10], B: [5] }
        const requestedSeatColumns: { [key: string]: number[] } = {
            ...requestedSeats.reduce((acc: any, seat) => {
                const row = seat[0];
                const column = parseInt(seat.slice(1));
                return {
                    ...acc,
                    [row]: [...(acc[row] || []), column]
                }
            }, {})
        };

        const remainingSeats: { [key: string]: number[] } = {};

        requestedSeatRows.forEach((row) => {
            remainingSeats[row] = seatPlan[row].filter((column) => {
                if (seatStatus[row] === undefined) {
                    return !requestedSeatColumns[row].includes(column);
                }
                return !requestedSeatColumns[row].includes(column) && !seatStatus[row].includes(column);
            }
            )
        })
        return remainingSeats;
    };

    // A function to check if requested seats will leave a single seat gap before and after the requested seats
    const checkSingleSeatGap = (requestedSeats: string[], seatStatus: { [key: string]: number[] }) => {
        // Requested seat rows without repetition
        const requestedSeatRows: string[] = [...new Set(requestedSeats.map((seat) => seat[0]))];

        // Requested seat columns as per row: { A: [10], B: [5] }
        const requestedSeatColumns: { [key: string]: number[] } = {
            ...requestedSeats.reduce((acc: any, seat) => {
                const row = seat[0];
                const column = parseInt(seat.slice(1));
                return {
                    ...acc,
                    [row]: [...(acc[row] || []), column]
                }
            }, {})
        };

        const singleSeatGap: { [key: string]: boolean[] } = {};
        requestedSeatRows.forEach((row) => {
            singleSeatGap[row] = requestedSeatColumns[row].map((column) => {
                if (seatStatus[row] === undefined) {
                    return false;
                }

                return !seatStatus[row].includes(column - 1) && !seatStatus[row].includes(column + 1);
            })
        }
        )

        const allFlag = Object.values(singleSeatGap).every((flag) => flag.every((seat) => seat === false));

        return {
            allFlag: !allFlag,
            singleSeatGap
        };
    };

    const checkGapBetweenSelection = (requestedSeats: string[]) => {
        const requestedSeatRows: string[] = [...new Set(requestedSeats.map((seat) => seat[0]))];

        // Requested seat columns as per row: { A: [10], B: [5] }
        const requestedSeatColumns: { [key: string]: number[] } = {
            ...requestedSeats.reduce((acc: any, seat) => {
                const row = seat[0];
                const column = parseInt(seat.slice(1));
                return {
                    ...acc,
                    [row]: [...(acc[row] || []), column]
                }
            }, {})
        };

        const gapBetweenSelection: { [key: string]: boolean[] } = {};
        requestedSeatRows.forEach((row) => {
            gapBetweenSelection[row] = requestedSeatColumns[row].map((column) => {
                return !requestedSeatColumns[row].includes(column - 1) && !requestedSeatColumns[row].includes(column + 1);
            })
        }
        )
        return gapBetweenSelection;
    }

    return {
        checkRequestedSeats,
        remainingSeats,
        checkSingleSeatGap,
        checkGapBetweenSelection
    }
}