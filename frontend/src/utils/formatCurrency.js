


// utils/formatCurrency.js

export function formatCurrency(value){

    return Number(value).toLocaleString("en-IN",{

        style:"currency",

        currency:"INR",

        maximumFractionDigits:0,

    });

}

