// Core
import React from 'react';

// Hooks
import {useCheckin} from './hooks/useCheckin';
import {useQueryAllCheckedOutPets} from './hooks/useQueryAllCheckedOutPets';

export const CheckinPet = () => {
    const {pets, loading, error: checkedOutPetsError} = useQueryAllCheckedOutPets();
    const {checkIn, pet, errors, error} = useCheckin();

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

    const errorJSX = (error || checkedOutPetsError) && (
        <p>
            We have another problem: {error || checkedOutPetsError}
        </p>
    );

    const dropdownJSX = pets && (
        <select onChange={({target: {value}}) => checkIn(value)}>
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
            <h1>Checkin</h1>
            {dropdownJSX}
            {petJSX}
            {errorsJSX}
            {errorJSX}
        </>
    )
};
