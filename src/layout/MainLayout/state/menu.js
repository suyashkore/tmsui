import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// Initial state for the menu, defining default values for the application.
const initialState = {
    isDashboardDrawerOpened: false // Default state indicating whether the dashboard drawer is open or closed.
};

// Endpoints object storing keys used to identify different parts of the state.
export const endpoints = {
    key: 'api/menu', // Base key for menu-related state management.
    master: 'master' // Specific key used for the master menu state.
};

/**
 * Custom hook to retrieve the current state of the menu (menu master state).
 * This hook leverages SWR (stale-while-revalidate) to manage state updates efficiently.
 *
 * @returns {Object} - Contains the current menu state (`menuMaster`) and loading status (`menuMasterLoading`).
 */
export function useGetMenuMaster() {
    // useSWR hook to fetch and cache the menu master state. 
    // SWR handles data fetching, caching, and revalidation under the hood.
    const { data, isLoading } = useSWR(
        endpoints.key + endpoints.master, // The unique key used by SWR to identify the state.
        () => initialState,              // Function that provides the initial state when no data is cached.
        {
            revalidateIfStale: false,    // Do not revalidate if the data is considered stale (expired).
            revalidateOnFocus: false,    // Do not revalidate when the user focuses on the window.
            revalidateOnReconnect: false // Do not revalidate when the user reconnects to the internet.
        }
    );

    // Memoize the returned value to avoid unnecessary re-renders.
    const memoizedValue = useMemo(
        () => ({
            menuMaster: data,           // The current menu master state.
            menuMasterLoading: isLoading // Boolean indicating if the data is still loading.
        }),
        [data, isLoading]               // Dependencies array to recompute the memoized value when `data` or `isLoading` changes.
    );

    return memoizedValue; // Return the memoized menu state and loading status.
}

/**
 * Function to handle opening and closing of the dashboard drawer.
 * It uses SWR's mutate function to update the local state for the menu.
 *
 * @param {boolean} isDashboardDrawerOpened - Indicates whether the dashboard drawer should be opened or closed.
 */
export function handlerDrawerOpen(isDashboardDrawerOpened) {
    // Use the mutate function from SWR to update the local state in an immutable way.
    mutate(
        endpoints.key + endpoints.master, // Identify which part of the state to update using the key.
        (currentMenuMaster) => {
            // Return a new state object by spreading the current state and updating the `isDashboardDrawerOpened` property.
            return { ...currentMenuMaster, isDashboardDrawerOpened };
        },
        false // Specify whether to revalidate the data after the mutation. False means no revalidation.
    );
}
