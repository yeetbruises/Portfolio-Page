import React, { useState } from "react";
import { motion } from "framer-motion";

export function Arrow() {

    return (

        <svg xmlns="http://www.w3.org/2000/svg" 
             width="24" 
             height="24" 
             viewBox="0 0 24 24" 
             fill="none" 
             stroke="currentColor" 
             stroke-width="2" 
             stroke-linecap="round" 
             stroke-linejoin="round" 
             class="lucide 
                    lucide-arrow-right 
                    h-4 w-4 mt-1 
                    flex-shrink-0
                    mr-2">
            
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
            
        </svg>


    );

}