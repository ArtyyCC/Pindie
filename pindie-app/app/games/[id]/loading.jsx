import Styles from "@/app/games/[id]/loading.module.css";
import React from 'react';
import {Preloader} from "@/app/components/Preloader/Preloader";

const Loading = () => {
    return (
        <div>
            <Preloader/>
        </div>
    );
};

export default Loading;