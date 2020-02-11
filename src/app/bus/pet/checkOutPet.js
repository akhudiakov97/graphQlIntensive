// Core
import React from 'react';

// Hooks
import {useCheckOut} from './hooks/useCheckOut';
import {useQueryAllAvailablePets} from './hooks/useQueryAllAvailablePets';

export const CheckOutPet = () => {
    const {pets, loading, error: allAvailablePetsError} = useQueryAllAvailablePets();
    const {checkOut, pet, errors, error} = useCheckOut();

    if (loading) {
        return (
            <p>Loading ...</p>
        )
    }

    const petJSX = pet && (
        <>
            <p>Id: {pet.id}</p>
            <p>Name: {pet.name}</p>
        </>
    );

    const errorsJSX = errors && (
        <p>
            We have a problem: {errors.message}
        </p>
    );

    const errorJSX = (error || allAvailablePetsError) && (
        <p>
            We have another problem: {error || allAvailablePetsError}
        </p>
    );

    const dropdownJSX = pets && (
        <select onChange={({target: {value}}) => checkOut(value)}>
            {pets.map(pet => (
                <option
                    key={pet.id}
                    value={pet.id}
                >
                    {pet.name}
                </option>
            ))}
        </select>
    );

    return (
        <>
            <h1>CheckOut</h1>
            {dropdownJSX}
            {petJSX}
            {errorsJSX}
            {errorJSX}
        </>
    )
};
