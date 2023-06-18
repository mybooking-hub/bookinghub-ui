import { queryClient } from "src/main"

const invalidateQueries = (key: string[]) => {
    queryClient.setQueriesData([...key], null);
    queryClient.invalidateQueries({ queryKey: [...key] })
}

export {
    invalidateQueries
}