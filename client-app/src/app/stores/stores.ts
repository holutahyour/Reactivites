import { createContext, useContext } from "react";
import ActivityStore from "./activityStores";

interface IStore{
    activityStore: ActivityStore
}

export const store: IStore = {
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
