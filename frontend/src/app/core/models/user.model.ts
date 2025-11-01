export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Property {
  _id?: string;
  ownerName: string;
  ownerMobileNumber: string;
  propertyAddress: string;
  propertyRent: number;
  propertyType: string;
  propertyDescription: string;
  propertyMedia?: string[];
  ownerImage?: string;
}

export interface PropertyClient {
  _id?: string;
  clientName: string;
  clientMobileNumber: string;
  clientAddress: string;
  clientBudget: number;
  clientLookingForPropertyType: string;
  clientImage?: string;
}

export interface Vehicle {
  _id?: string;
  driverName: string;
  driverMobileNumber: string;
  driverVehicleNumber: string;
  driverAddress: string;
  driverFare: number;
  driverDescription: string;
  driverImage?: string;
  vehicleImage?: string;
}

export interface RideClient {
  _id?: string;
  clientName: string;
  clientMobileNumber: string;
  clientAddress: string;
  clientFareBudget: number;
  clientDescription: string;
  clientImage?: string;
}

export interface Caterer {
  _id?: string;
  catererName: string;
  catererMobileNumber: string;
  catererAddress: string;
  catererFare: number;
  catererDescription: string;
  catererImage?: string;
}

export interface TiffinClient {
  _id?: string;
  clientName: string;
  clientMobileNumber: string;
  clientAddress: string;
  clientFareBudget: number;
  clientDescription: string;
  clientImage?: string;
}
