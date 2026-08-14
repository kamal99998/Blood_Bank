CREATE DATABASE IF NOT EXISTS blood_bank;

USE blood_bank;


-- =========================================
-- USERS TABLE
-- =========================================

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    phone VARCHAR(20) NOT NULL,

    address VARCHAR(255),

    date_of_birth DATE,

    is_interested BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- =========================================
-- DONORS TABLE
-- =========================================

CREATE TABLE donors (
    donor_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL UNIQUE,

    blood_group VARCHAR(5) NOT NULL,

    is_available BOOLEAN NOT NULL DEFAULT TRUE,

    last_donation_date DATE NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_donor_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- =========================================
-- BLOOD REQUESTS TABLE
-- =========================================

CREATE TABLE blood_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,

    requester_id INT NOT NULL,

    donor_id INT NOT NULL,

    blood_group VARCHAR(5) NOT NULL,

    hospital_name VARCHAR(150) NOT NULL,

    hospital_address VARCHAR(255),

    required_date DATE NOT NULL,

    units_required INT NOT NULL DEFAULT 1,

    reason TEXT,

    status ENUM(
        'Pending',
        'Accepted',
        'Rejected',
        'Cancelled'
    ) NOT NULL DEFAULT 'Pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_request_requester
        FOREIGN KEY (requester_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_request_donor
        FOREIGN KEY (donor_id)
        REFERENCES donors(donor_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- =========================================
-- REQUEST RESPONSES TABLE
-- =========================================

CREATE TABLE request_responses (
    response_id INT AUTO_INCREMENT PRIMARY KEY,

    request_id INT NOT NULL,

    donor_id INT NOT NULL,

    response_type ENUM(
        'Accepted',
        'Rejected',
        'Message'
    ) NOT NULL,

    message TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_response_request
        FOREIGN KEY (request_id)
        REFERENCES blood_requests(request_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_response_donor
        FOREIGN KEY (donor_id)
        REFERENCES donors(donor_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);