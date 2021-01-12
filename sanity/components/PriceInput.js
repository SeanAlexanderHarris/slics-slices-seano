import React from 'react';
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value){
    console.log("PriceInput GETTING CALLED");
    return PatchEvent.from(value === '' ? unset() : set(Number(value)) );
}

const formatMoney = Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
}).format;

PriceInput.focus = function(){
    this._inputElement.focus();
}

export default function PriceInput({type, value, onChange, inputComponent}){
    return (<div>
    <h2>{type.title} - {value ? formatMoney(value / 100) : ''}</h2>
    <p>{type.description}</p>
    <input type={type.name} value={value} onChange={event => onChange(createPatchFrom(event.target.value))} ref={inputComponent} />
    </div>)
}