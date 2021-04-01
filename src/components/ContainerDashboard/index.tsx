import React from "react";
import {ContainerView} from "./style";

const ContainerViewDashboard: React.FC = ({children}) => {
    return (
        <ContainerView>
            {children}
        </ContainerView>
    );
};

export default ContainerViewDashboard;
