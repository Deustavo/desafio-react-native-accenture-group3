import React from "react";
import {ContainerScrollView} from "./style";
import {SafeAreaView} from "react-native-safe-area-context";

interface ScrollViewProps {
    _bgColor?: string;
}

const ContainerScroll: React.FC<ScrollViewProps> = ({children, _bgColor}) => {
    return (
        <SafeAreaView style={{backgroundColor: "#a100ff"}}>
            <ContainerScrollView _bgColor={_bgColor}>
                {children}
            </ContainerScrollView>
        </SafeAreaView>
    );
};

export default ContainerScroll;
