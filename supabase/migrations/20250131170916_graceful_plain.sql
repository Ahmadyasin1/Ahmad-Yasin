/*
  # Add initial showcase projects
  
  1. Changes
    - Adds three initial projects
    - Links projects with technologies
    - Links projects with team members
*/

-- Insert initial projects
INSERT INTO projects (
  title,
  slug,
  description,
  content,
  category,
  thumbnail_url,
  github_url,
  demo_url,
  status,
  is_featured
) VALUES
(
  'AI-Powered Object Detection System',
  'ai-object-detection',
  'Real-time object detection system using deep learning and computer vision, capable of identifying and tracking multiple objects simultaneously.',
  '# AI-Powered Object Detection System

## Overview
This project implements a state-of-the-art object detection system using deep learning techniques. The system can identify and track multiple objects in real-time with high accuracy.

## Features
- Real-time object detection and tracking
- Support for multiple object classes
- High accuracy and performance
- Easy integration with existing systems
- Customizable detection parameters

## Technical Details
The system uses a combination of:
- YOLOv5 for object detection
- OpenCV for image processing
- PyTorch for deep learning
- Custom tracking algorithms

## Results
In testing, the system achieved:
- 95% accuracy on standard benchmarks
- 30 FPS processing speed
- Support for 80+ object classes',
  'AI/ML Models',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80',
  'https://github.com/Ahmadyasin1/ai-object-detection',
  'https://demo.ai-object-detection.com',
  'published',
  true
),
(
  'Smart Home Automation Hub',
  'smart-home-hub',
  'IoT-based home automation system that integrates various smart devices and provides a unified control interface with AI-powered automation.',
  '# Smart Home Automation Hub

## Overview
A comprehensive IoT solution for home automation that brings together various smart devices under a single, intuitive control interface.

## Features
- Centralized device control
- AI-powered automation
- Energy usage optimization
- Custom automation rules
- Mobile app control

## Technical Implementation
Built using:
- Raspberry Pi as the central hub
- Custom PCB design for sensors
- MQTT for device communication
- Node.js backend
- React Native mobile app',
  'IoT Hardware',
  'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80',
  'https://github.com/Ahmadyasin1/smart-home-hub',
  'https://demo.smart-home-hub.com',
  'published',
  true
),
(
  'Neural Network Research Paper',
  'neural-network-research',
  'Research paper exploring novel neural network architectures for improved natural language processing, with focus on reducing computational requirements.',
  '# Efficient Neural Networks for NLP

## Abstract
This research explores novel neural network architectures designed to improve natural language processing while reducing computational requirements.

## Methodology
- Comparative analysis of architectures
- Performance benchmarking
- Resource utilization studies
- Real-world application testing

## Results
Our findings show:
- 40% reduction in computational needs
- Maintained accuracy levels
- Improved training efficiency
- Better resource utilization',
  'Research',
  'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?auto=format&fit=crop&q=80',
  'https://github.com/Ahmadyasin1/neural-network-research',
  'https://arxiv.org/neural-network-research',
  'published',
  true
);

-- Link projects with technologies
WITH project_ids AS (
  SELECT id, slug FROM projects WHERE slug IN ('ai-object-detection', 'smart-home-hub', 'neural-network-research')
),
tech_ids AS (
  SELECT id, name FROM technologies
)
INSERT INTO project_technologies (project_id, technology_id)
SELECT 
  p.id,
  t.id
FROM project_ids p
CROSS JOIN tech_ids t
WHERE 
  (p.slug = 'ai-object-detection' AND t.name IN ('Python', 'TensorFlow', 'OpenCV')) OR
  (p.slug = 'smart-home-hub' AND t.name IN ('Node.js', 'React', 'Arduino', 'Raspberry Pi')) OR
  (p.slug = 'neural-network-research' AND t.name IN ('Python', 'PyTorch', 'TensorFlow'));

-- Link projects with team members
WITH project_ids AS (
  SELECT id, slug FROM projects WHERE slug IN ('ai-object-detection', 'smart-home-hub', 'neural-network-research')
),
member_ids AS (
  SELECT id FROM team_members WHERE name = 'Ahmad Yasin'
)
INSERT INTO project_team_members (project_id, team_member_id, contribution)
SELECT 
  p.id,
  m.id,
  CASE 
    WHEN p.slug = 'ai-object-detection' THEN 'Lead Developer & AI Engineer'
    WHEN p.slug = 'smart-home-hub' THEN 'System Architect & IoT Developer'
    ELSE 'Lead Researcher & Author'
  END
FROM project_ids p
CROSS JOIN member_ids m;