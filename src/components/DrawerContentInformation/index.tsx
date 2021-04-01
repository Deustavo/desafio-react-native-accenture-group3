import React from "react";
import {ContainerInformationRow, TitleContainer, TextContent} from "./styles";

interface InformationContainer {
    title: string;
    description: string;
}

const DrawerContentInformation: React.FC<InformationContainer> = ({title, description}) => {
    return (
        <ContainerInformationRow>
            <TitleContainer>
                {title}
            </TitleContainer>
            <TextContent>
                {description}
            </TextContent>
        </ContainerInformationRow>
    );
};

export default DrawerContentInformation;
