# Last-Mile Delivery Tracker

A full-stack MERN application for managing last-mile delivery operations with intelligent pricing, automatic delivery agent assignment, live order tracking, and customer notifications.

---

# Project Overview

The **Last-Mile Delivery Tracker** is a logistics management platform that enables customers to place delivery orders while allowing administrators to manage delivery operations efficiently. The system automatically calculates delivery charges using configurable rate cards, intelligently assigns delivery agents, tracks every delivery stage, and sends notifications to customers throughout the delivery lifecycle.

The application is built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** and follows a modular architecture for scalability and maintainability.

---

# Project Requirements Summary

## Customer

* Register/Login
* Create delivery orders
* View delivery charges before confirmation
* Track delivery status
* View tracking timeline
* Receive Email/SMS notifications
* Reschedule failed deliveries

---

## Delivery Agent

* Login
* View assigned deliveries
* Update delivery status
* Update current location
* Complete or fail delivery

---

## Admin

* Manage Zones
* Manage Rate Cards
* Configure COD Charges
* Manage Delivery Agents
* Create Orders
* Manual Agent Assignment
* Automatic Agent Assignment
* Override Order Status
* View All Orders
* Filter Orders

---

# Features

## Authentication

* JWT Authentication
* Password Encryption (bcrypt)
* Role-Based Authorization
* Customer
* Delivery Agent
* Admin

---

## Order Management

* Create Orders
* View Orders
* Cancel Orders
* Reschedule Failed Orders
* Track Orders

---

## Pricing Engine

* Pickup Zone Detection
* Drop Zone Detection
* Volumetric Weight Calculation
* Billable Weight Calculation
* B2B Rate Cards
* B2C Rate Cards
* COD Surcharge
* Dynamic Pricing

---

## Agent Management

* Manual Assignment
* Automatic Assignment
* Availability Tracking
* Zone Based Assignment

---

## Notifications

* Email Notifications
* SMS Notifications
* Status Update Alerts

---

## Tracking

* Live Order Status
* Tracking Timeline
* Immutable Tracking History

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios

---

## Backend

* Node.js
* Express.js
* JWT
* bcrypt
* Nodemailer

---

## Database

* MongoDB
* Mongoose

---

## External Services

* Google Maps API (Zone Detection)
* Twilio (SMS)
* Nodemailer (Email)

---

#  System Architecture

```
                   +-----------------------+
                   |      React Client     |
                   |-----------------------|
                   | Customer Dashboard    |
                   | Agent Dashboard       |
                   | Admin Dashboard       |
                   +-----------+-----------+
                               |
                         REST APIs
                               |
                +--------------+--------------+
                |         Express API         |
                +--------------+--------------+
                               |
         ------------------------------------------------
         |             |              |                 |
     Authentication  Orders     Pricing Engine     Assignment
         |             |              |                 |
         ------------------------------------------------
                               |
                       Notification Service
                     (Email & SMS Services)
                               |
                         MongoDB Database
```

---

# System Workflow

```
Customer Login

        │

        ▼

Create Order

        │

        ▼

Pickup & Drop Address

        │

        ▼

Zone Detection

        │

        ▼

Volumetric Weight Calculation

        │

        ▼

Billable Weight Calculation

        │

        ▼

Rate Card Lookup

        │

        ▼

Delivery Charge

        │

        ▼

Customer Confirms

        │

        ▼

Assign Delivery Agent

        │

        ▼

Delivery Status Updates

        │

        ▼

Delivered / Failed

        │

        ▼

Notification Sent
```

---

# 🗄 Database Schema

## Users Collection

```javascript
{
    _id,
    name,
    email,
    phone,
    password,
    role,          // customer | admin | agent
    address,
    createdAt
}
```

---

## Delivery Agents Collection

```javascript
{
    _id,
    userId,
    currentLocation,
    zone,
    availability,
    totalDeliveries,
    rating
}
```

---

## Zones Collection

```javascript
{
    _id,
    zoneName,
    city,
    pincodes: [],
    coordinates
}
```

---

## Rate Cards Collection

```javascript
{
    _id,
    pickupZone,
    dropZone,
    orderType,        // B2B | B2C
    pricePerKg,
    codCharge
}
```

---

## Orders Collection

```javascript
{
    _id,

    customer,

    pickupAddress,

    dropAddress,

    pickupZone,

    dropZone,

    length,

    breadth,

    height,

    actualWeight,

    volumetricWeight,

    billableWeight,

    paymentType,

    orderType,

    deliveryCharge,

    assignedAgent,

    status,

    rescheduleDate,

    createdAt
}
```

---

## Tracking History Collection

```javascript
{
    _id,
    orderId,
    status,
    updatedBy,
    remarks,
    timestamp
}
```

---

## Notifications Collection

```javascript
{
    _id,
    userId,
    orderId,
    type,
    message,
    isRead,
    createdAt
}
```

---

# Database Relationship

```
Users
 │
 ├──────────── Customer
 │
 ├──────────── Admin
 │
 └──────────── Agent
                  │
                  │
               Orders
                  │
        ┌─────────┴─────────┐
        │                   │
 TrackingHistory      Notifications
                  │
               RateCards
                  │
                Zones
```

---

#  Rate Calculation Engine

## Step 1

Calculate Volumetric Weight

```
Volumetric Weight =
(L × B × H) / 5000
```

---

## Step 2

Calculate Billable Weight

```
Billable Weight =
max(actualWeight, volumetricWeight)
```

---

## Step 3

Identify Pickup Zone

---

## Step 4

Identify Drop Zone

---

## Step 5

Select Correct Rate Card

Depending upon

* B2B
* B2C
* Intra Zone
* Inter Zone

---

## Step 6

Calculate Price

```
Delivery Charge

=

Billable Weight

×

Price Per Kg
```

---

## Step 7

If COD

```
Delivery Charge

+= COD Charge
```

---

#  Auto Agent Assignment

The assignment engine follows the following process.

```
Get Pickup Zone

        │

Find Available Agents

        │

Filter By Zone

        │

Find Nearest Agent

        │

Assign Order

        │

Update Availability
```

---

#  Order Status Lifecycle

```
Pending

↓

Assigned

↓

Picked Up

↓

In Transit

↓

Out For Delivery

↓

Delivered
```

---

## Failed Delivery

```
Out For Delivery

↓

Failed

↓

Customer Reschedules

↓

Agent Assigned Again

↓

Delivered
```

Every status update creates a new tracking record that cannot be modified.

---

# API Overview

## Authentication

* POST /api/auth/register
* POST /api/auth/login

---

## Orders

* POST /api/orders
* GET /api/orders
* GET /api/orders/:id
* PATCH /api/orders/:id/status

---

## Agents

* GET /api/agents
* PATCH /api/agents/location

---

## Admin

* POST /api/admin/ratecards
* POST /api/admin/zones
* PATCH /api/admin/orders/:id/assign

---

#  Folder Structure

```
LastMileDeliveryTracker

client/
│
├── src/
│   ├── components
│   ├── pages
│   ├── hooks
│   ├── services
│   ├── layouts
│   └── utils
│
server/
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── services
├── utils
└── server.js
```

---

# Installation

## Clone Repository

```
git clone https://github.com/anurrraggg/Last-Mile-Delivery-Tracker.git
```

---

## Backend

```
cd server

npm install

npm run dev
```

---

## Frontend

```
cd client

npm install

npm run dev
```

---


#  System Design Document

## Overview

The Last-Mile Delivery Tracker is designed as a modular MERN application supporting three user roles: Customer, Delivery Agent, and Admin. The architecture separates presentation, business logic, and data storage, making the application scalable and maintainable.

## Pricing Engine

The pricing engine dynamically calculates delivery charges without hardcoded values. It determines pickup and destination zones, calculates volumetric weight using the formula **(L × B × H) ÷ 5000**, selects the higher of actual or volumetric weight as the billable weight, retrieves the correct B2B or B2C rate card, and applies a COD surcharge when applicable.

## Zone Detection

Zones are configured by administrators using geographic boundaries or pincodes. During order creation, the system maps pickup and destination addresses to their respective zones, enabling accurate rate-card selection for intra-zone and inter-zone deliveries.

## Auto Agent Assignment

When automatic assignment is triggered, the system filters delivery agents based on availability and service zone. If multiple agents are available, the nearest agent is selected using location data. If no agent is available, the order remains pending until an administrator manually assigns one.

## Order Lifecycle

Orders move through the following stages:

Pending → Assigned → Picked Up → In Transit → Out for Delivery → Delivered

If a delivery attempt fails, the status changes to **Failed**, the customer is notified, a reschedule request is recorded, and the order enters the assignment process again for a new delivery attempt.

## Tracking History

Every status update creates a new immutable tracking record containing the status, timestamp, actor, and remarks. Existing records are never modified, ensuring a complete audit trail for every order.

## Notification Service

Customers receive automated email and SMS notifications whenever the order status changes. Notification services operate independently from core business logic, improving responsiveness and allowing future integration with additional communication channels.

## Scalability

The application follows a layered architecture with separate modules for authentication, order management, pricing, assignment, notifications, and administration. MongoDB indexing, stateless REST APIs, and modular services make the system easy to scale horizontally and extend with future features such as real-time tracking, analytics dashboards, and route optimization.
