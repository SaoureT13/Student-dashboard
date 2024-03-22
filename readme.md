## Models

- Batchs:
    - name (Batch A, Batch B, Batch C)
-PaymentStatus:
    - status (completed or Pending)   
- students: 
    - name 
    - email 
    - phone number
    - course
    - batch_id (foreign key => Batchs)
    - payment_status (foreign key => PaymentStatus)

## Features

Backend
- Ajout d'un etudiant
- Modification d'un etudiant:  
    Ouvertude d'un modal qui recupere les infos et affiche le resultat
- Suppression d'un etudiant

Frontend
- Sort by:
    - The payment status
    - Batch name

- Search by:
    - name
    - email
    - phone number

## Use

useReducer
useState
useContext