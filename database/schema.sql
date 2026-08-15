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

-- =========================================
-- SEED DATA
-- =========================================

INSERT INTO users (name, email, password, phone, address, date_of_birth, is_interested) VALUES
('Admin User', 'admin@bloodbank.com', 'hashed_pw_1', '1234567890', '123 Admin St', '1990-01-01', TRUE),
('John Doe', 'john@example.com', 'hashed_pw_2', '0987654321', '456 Main St', '1985-05-15', TRUE),
('Jane Smith', 'jane@example.com', 'hashed_pw_3', '1112223333', '789 Oak Ave', '1992-10-20', FALSE);

INSERT INTO donors (user_id, blood_group, is_available, last_donation_date) VALUES
(1, 'O+', TRUE, '2023-01-10'),
(2, 'A-', FALSE, '2023-11-01');

INSERT INTO blood_requests (requester_id, donor_id, blood_group, hospital_name, hospital_address, required_date, units_required, reason, status) VALUES
(3, 1, 'O+', 'City Hospital', '101 Health Blvd', '2023-12-01', 2, 'Surgery', 'Pending');