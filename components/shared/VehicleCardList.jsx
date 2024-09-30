import React from 'react';
import VehicleCard from '../helpers/VehicleCard';
import car from "@/public/assets/car.webp";
import pickup from "@/public/assets/pickup.jpg";

export default function VehicleCardList() {
  const cars = [
    {
      model: 'Toyota Camry New',
      description: '3.5 D5 PowerPulse Momentum 5dr AW...',
      mileage: 20,
      fuel: 'Petrol',
      transmission: 'Automatic',
      price: 40000,
      image: car,
      tag: 'Great Price',
      detailsLink: '/details/toyota-camry',
    },
    {
      model: 'C-Class – 2023',
      description: '4.0 D5 PowerPulse Momentum 5dr AW...',
      mileage: 50,
      fuel: 'Petrol',
      transmission: 'Automatic',
      price: 150000,
      image: pickup,
      tag: 'Great Price',
      detailsLink: '/details/c-class',
    },
    {
      model: 'Ford Transit – 2021',
      description: '4.0 D5 PowerPulse Momentum 5dr AW...',
      mileage: 2500,
      fuel: 'Diesel',
      transmission: 'Manual',
      price: 22000,
      image: car,
      tag: 'Great Price',
      detailsLink: '/details/ford-transit',
    },
    {
      model: 'New GLC – 2023',
      description: '4.0 D5 PowerPulse Momentum 5dr AW...',
      mileage: 50,
      fuel: 'Petrol',
      transmission: 'Automatic',
      price: 95000,
      image: pickup,
      tag: 'Low Mileage',
      detailsLink: '/details/new-glc',
    },
    {
      model: 'New GLC – 2023',
      description: '4.0 D5 PowerPulse Momentum 5dr AW...',
      mileage: 50,
      fuel: 'Petrol',
      transmission: 'Automatic',
      price: 95000,
      image: pickup,
      tag: 'Low Mileage',
      detailsLink: '/details/new-glc',
    },
    {
      model: 'New GLC – 2023',
      description: '4.0 D5 PowerPulse Momentum 5dr AW...',
      mileage: 50,
      fuel: 'Petrol',
      transmission: 'Automatic',
      price: 95000,
      image: pickup,
      tag: 'Low Mileage',
      detailsLink: '/details/new-glc',
    },
    {
      model: 'New GLC – 2023',
      description: '4.0 D5 PowerPulse Momentum 5dr AW...',
      mileage: 50,
      fuel: 'Petrol',
      transmission: 'Automatic',
      price: 95000,
      image: pickup,
      tag: 'Low Mileage',
      detailsLink: '/details/new-glc',
    },
    {
      model: 'New GLC – 2023',
      description: '4.0 D5 PowerPulse Momentum 5dr AW...',
      mileage: 50,
      fuel: 'Petrol',
      transmission: 'Automatic',
      price: 95000,
      image: pickup,
      tag: 'Low Mileage',
      detailsLink: '/details/new-glc',
    },
    {
      model: 'New GLC – 2023',
      description: '4.0 D5 PowerPulse Momentum 5dr AW...',
      mileage: 50,
      fuel: 'Petrol',
      transmission: 'Automatic',
      price: 95000,
      image: pickup,
      tag: 'Low Mileage',
      detailsLink: '/details/new-glc',
    },
    {
      model: 'New GLC – 2023',
      description: '4.0 D5 PowerPulse Momentum 5dr AW...',
      mileage: 50,
      fuel: 'Petrol',
      transmission: 'Automatic',
      price: 95000,
      image: pickup,
      tag: 'Low Mileage',
      detailsLink: '/details/new-glc',
    },
    {
      model: 'New GLC – 2023',
      description: '4.0 D5 PowerPulse Momentum 5dr AW...',
      mileage: 50,
      fuel: 'Petrol',
      transmission: 'Automatic',
      price: 95000,
      image: pickup,
      tag: 'Low Mileage',
      detailsLink: '/details/new-glc',
    },
    {
      model: 'New GLC – 2023',
      description: '4.0 D5 PowerPulse Momentum 5dr AW...',
      mileage: 50,
      fuel: 'Petrol',
      transmission: 'Automatic',
      price: 95000,
      image: pickup,
      tag: 'Low Mileage',
      detailsLink: '/details/new-glc',
    },
  ];

    return (
      <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cars.map((car, index) => (
          <VehicleCard key={index} car={car} />
        ))}
      </div>
    </div>
    );
}
