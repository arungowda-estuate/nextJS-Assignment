"use client"


import Dropdown from '@/components/shared/dropdown';
import InputWithBrowse from '@/components/shared/inputwithbutton';
import React from 'react';
// import InputWithBrowse from '../../components/shared/inputwithbutton';
// import Dropdown from '../../components/shared/dropdown';

export default function SharedPage() {
  return (
    <div className="shared-page-container">
      <InputWithBrowse onInputChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
        throw new Error('Function not implemented.');
      } } onButtonClick={function (): void {
        throw new Error('Function not implemented.');
      } } />
     
      <Dropdown onChange={function (value: string): void {
        throw new Error('Function not implemented.');
      } } />
      
    </div>
  );
}
