"use client";

import React, { useState, useEffect } from "react";

const ASCII_FRAMES = [
`      .oOOOOOo.      
    .O'       'O.    
   .O           O.   
   |      ₿      |   
   .O           O.   
    .O.       .O'    
      'oOOOOOo'      `,
`       .oOOOo.       
     .O'     'O.     
    .O         O.    
    |     ₿     |    
    .O         O.    
     .O.     .O'     
       'oOOOo'       `,
`        .oOo.        
      .O'   'O.      
     .O       O.     
     |    ₿    |     
     .O       O.     
      .O.   .O'      
        'oOo'        `,
`          .          
        .O'O.        
       .O   O.       
       |  |  |       
       .O   O.       
        .O.O'        
          '          `,
`        .oOo.        
      .O'   'O.      
     .O       O.     
     |    ₿    |     
     .O       O.     
      .O.   .O'      
        'oOo'        `,
`       .oOOOo.       
     .O'     'O.     
    .O         O.    
    |     ₿     |    
    .O         O.    
     .O.     .O'     
       'oOOOo'       `,
];

export function RotatingBitcoin() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % ASCII_FRAMES.length);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <pre className="font-(family-name:--font-source-code-pro) text-[#39d353] leading-tight text-xs sm:text-sm md:text-base whitespace-pre-wrap select-none flex items-center justify-center">
      {ASCII_FRAMES[frame]}
    </pre>
  );
}
