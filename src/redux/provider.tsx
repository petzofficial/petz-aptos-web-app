"use client"

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/app/store";

interface ReduxAppProviderProps {
    children: ReactNode;
}

export const ReduxAppProvider: React.FC<ReduxAppProviderProps> = ({ children }) => (
    <Provider store={store}>
        {children}
    </Provider>
);
