import React from "react";
import {ContainerView} from "./style";

const ContainerViewLoginRegister: React.FC = ({children}) => {
    return (
        <ContainerView>
            {children}
        </ContainerView>
    );
};

export default ContainerViewLoginRegister;
