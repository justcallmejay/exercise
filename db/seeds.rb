# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

###### BACK BACK BACK BACK BACK BACK BACK BACK BACK BACK BACK BACK BACK BACK BACK BACK BACK ######
###### BACK BACK BACK BACK BACK BACK BACK BACK BACK BACK BACK BACK BACK BACK BACK BACK BACK ######

Workout.create(name: "Pulldown", kind: "Cable", muscles: "Back", difficulty: "Moderate")
Workout.create(name: "Pull-Ups", kind: "Bodyweight", muscles: "Back", difficulty: "Difficult")
Workout.create(name: "Australian Pullups", kind: "Bodyweight", muscles: "Back", difficulty: "Difficult")
Workout.create(name: "Lying Pullover", kind: "Dumbbell", muscles: "Back", difficulty: "Easy")
Workout.create(name: "One-Arm Bent Over Row", kind: "Dumbbell", muscles: "Back", difficulty: "Difficult")
Workout.create(name: "Bent Over Row", kind: "Barbell", muscles: "Back", difficulty: "Difficult")
Workout.create(name: "Seated Cable Row", kind: "Cable", muscles: "Back", difficulty: "Moderate")
Workout.create(name: "Cable Rows", kind: "Cable", muscles: "Back", difficulty: "Moderate")


###### BICEPS BICEPS BICEPS BICEPS BICEPS BICEPS BICEPS BICEPS BICEPS BICEPS BICEPS BICEPS ######
###### BICEPS BICEPS BICEPS BICEPS BICEPS BICEPS BICEPS BICEPS BICEPS BICEPS BICEPS BICEPS ######

Workout.create(name: "Bicep Curls", kind: "Dumbbell", muscles: "Biceps", difficulty: "Moderate")
Workout.create(name: "Hammer Curls", kind: "Dumbbell", muscles: "Biceps", difficulty: "Moderate")
Workout.create(name: "Reverse Curls", kind: "Dumbbell", muscles: "Biceps", difficulty: "Moderate")
Workout.create(name: "Bicep Curls", kind: "Barbell", muscles: "Biceps", difficulty: "Moderate")
Workout.create(name: "Reverse Curls", kind: "Barbell", muscles: "Biceps", difficulty: "Moderate")
Workout.create(name: "Chin Ups", kind: "Bodyweight", muscles: "Biceps", difficulty: "Difficult")


###### CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST ######
###### CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST CHEST ######

Workout.create(name: "Flat Bench Press", kind: "Dumbbell", muscles: "Chest", difficulty: "Moderate")
Workout.create(name: "Flat Bench Press", kind: "Barbell", muscles: "Chest", difficulty: "Difficult")
Workout.create(name: "Pushups", kind: "Bodyweight", muscles: "Chest", difficulty: "Moderate")
Workout.create(name: "Pec Flyes", kind: "Machine", muscles: "Chest", difficulty: "Easy")
Workout.create(name: "Incline Bench Press", kind: "Barbell", muscles: "Chest", difficulty: "Difficult")
Workout.create(name: "Incline Bench Press", kind: "Dumbbell", muscles: "Chest", difficulty: "Difficult")
Workout.create(name: "Decline Bench Press", kind: "Barbell", muscles: "Chest", difficulty: "Difficult")
Workout.create(name: "Decline Bench Press", kind: "Dumbbell", muscles: "Chest", difficulty: "Difficult")
Workout.create(name: "Pec Flyes", kind: "Dumbbell", muscles: "Chest", difficulty: "Moderate")
Workout.create(name: "Incline Pec Flyes", kind: "Dumbbell", muscles: "Chest", difficulty: "Moderate")
Workout.create(name: "Decline Pec Flyes", kind: "Dumbbell", muscles: "Chest", difficulty: "Moderate")

###### CALF CALF CALF CALF CALF CALF CALF CALF CALF CALF CALF CALF CALF CALF CALF CALF CALF ######
###### CALF CALF CALF CALF CALF CALF CALF CALF CALF CALF CALF CALF CALF CALF CALF CALF CALF ######

Workout.create(name: "Standing Calf Raise", kind: "Machine", muscles: "Calves", difficulty: "Easy")
Workout.create(name: "Seated Calf Raise", kind: "Machine", muscles: "Calves", difficulty: "Easy")
Workout.create(name: "Standing Calf Raise", kind: "Barbell", muscles: "Calves", difficulty: "Difficult")
Workout.create(name: "Seated Calf Raise", kind: "Barbell", muscles: "Calves", difficulty: "Moderate")
Workout.create(name: "Seated Calf Raise", kind: "Dumbbell", muscles: "Calves", difficulty: "Moderate")
Workout.create(name: "Seated Calf Raise", kind: "Dumbbell", muscles: "Calves", difficulty: "Moderate")

###### FOREARM FOREARM FOREARM FOREARM FOREARM FOREARM FOREARM FOREARM FOREARM FOREARM FOREARM ######
###### FOREARM FOREARM FOREARM FOREARM FOREARM FOREARM FOREARM FOREARM FOREARM FOREARM FOREARM ######

Workout.create(name: "Seated Wrist Curls", kind: "Dumbbell", muscles: "Forearm", difficulty: "Easy")
Workout.create(name: "Seated Wrist Curls", kind: "Barbell", muscles: "Forearm", difficulty: "Easy")
Workout.create(name: "Seated Reverse Wrist Curls", kind: "Dumbbell", muscles: "Forearm", difficulty: "Easy")
Workout.create(name: "Seated Reverse Wrist Curls", kind: "Barbell", muscles: "Forearm", difficulty: "Easy")
Workout.create(name: "Standing Wrist Curls", kind: "Dumbbell", muscles: "Forearm", difficulty: "Easy")
Workout.create(name: "Standing Reverse Wrist Curls", kind: "Dumbbell", muscles: "Forearm", difficulty: "Easy")
Workout.create(name: "Standing Wrist Curls", kind: "Barbell", muscles: "Forearm", difficulty: "Easy")
Workout.create(name: "Standing Reverse Wrist Curls", kind: "Barbell", muscles: "Forearm", difficulty: "Easy")

###### GLUTES GLUTES GLUTES GLUTES GLUTES GLUTES GLUTES GLUTES GLUTES GLUTES GLUTES GLUTES GLUTES ######
###### GLUTES GLUTES GLUTES GLUTES GLUTES GLUTES GLUTES GLUTES GLUTES GLUTES GLUTES GLUTES GLUTES ######

Workout.create(name: "Deadlift", kind: "Barbell", muscles: "Glutes", difficulty: "Difficult")
Workout.create(name: "Hip Bridges", kind: "Bodywight", muscles: "Glutes", difficulty: "Easy")
Workout.create(name: "Hip Thruster", kind: "Barbell", muscles: "Glutes", difficulty: "Moderate")
Workout.create(name: "Single-Legged Deadlift", kind: "Dumbbell", muscles: "Glutes", difficulty: "Difficult")
Workout.create(name: "Kickback", kind: "Bodyweight", muscles: "Glutes", difficulty: "Easy")
Workout.create(name: "Kickback", kind: "Cable", muscles: "Glutes", difficulty: "Moderate")
Workout.create(name: "Kickback", kind: "Machine", muscles: "Glutes", difficulty: "Easy")
Workout.create(name: "Seated Hip Abduction", kind: "Machine", muscles: "Glutes", difficulty: "Easy")

###### HAMSTRINGS HAMSTRINGS HAMSTRINGS HAMSTRINGS HAMSTRINGS HAMSTRINGS HAMSTRINGS HAMSTRINGS ######
###### HAMSTRINGS HAMSTRINGS HAMSTRINGS HAMSTRINGS HAMSTRINGS HAMSTRINGS HAMSTRINGS HAMSTRINGS ######

Workout.create(name: "Seated Leg Curls", kind: "Machine", muscles: "Hamstrings", difficulty: "Easy")
Workout.create(name: "Stiff-Legged Deadlift", kind: "Barbell", muscles: "Hamstrings", difficulty: "Difficult")
Workout.create(name: "Lying Leg Curls", kind: "Machine", muscles: "Hamstrings", difficulty: "Easy")
Workout.create(name: "Glute/Hame Raise", kind: "Machine", muscles: "Hamstrings", difficulty: "Difficult")

###### QUADS QUADS QUADS QUADS QUADS QUADS QUADS QUADS QUADS QUADS QUADS QUADS QUADS QUADS QUADS ######
###### QUADS QUADS QUADS QUADS QUADS QUADS QUADS QUADS QUADS QUADS QUADS QUADS QUADS QUADS QUADS ######

Workout.create(name: "Squat", kind: "Bodyweight", muscles: "Quads", difficulty: "Moderate")
Workout.create(name: "Squat", kind: "Barbell", muscles: "Quads", difficulty: "Difficult")
Workout.create(name: "Squat", kind: "Dumbbell", muscles: "Quads", difficulty: "Difficult")
Workout.create(name: "Lunges", kind: "Bodyweight", muscles: "Quads", difficulty: "Moderate")
Workout.create(name: "Seated Leg Press", kind: "Machine", muscles: "Quads", difficulty: "Easy")
Workout.create(name: "Lying Leg Press", kind: "Machine", muscles: "Quads", difficulty: "Moderate")
Workout.create(name: "Deficit Deadlift", kind: "Barbell", muscles: "Quads", difficulty: "Difficult")
Workout.create(name: "Seated Knee Extension", kind: "Machine", muscles: "Quads", difficulty: "Easy")
Workout.create(name: "Front Squat", kind: "Barbell", muscles: "Quads", difficulty: "Difficult")
Workout.create(name: "Walking Lunges", kind: "Barbell", muscles: "Quads", difficulty: "Difficult")
Workout.create(name: "Walking Lunges", kind: "Dumbbell", muscles: "Quads", difficulty: "Difficult")

###### SHOULDERS SHOULDERS SHOULDERS SHOULDERS SHOULDERS SHOULDERS SHOULDERS SHOULDERS SHOULDERS ######
###### SHOULDERS SHOULDERS SHOULDERS SHOULDERS SHOULDERS SHOULDERS SHOULDERS SHOULDERS SHOULDERS ######

Workout.create(name: "Military Press", kind: "Barbell", muscles: "Shoulders", difficulty: "Difficult")
Workout.create(name: "Shoulder Press", kind: "Dumbbell", muscles: "Shoulders", difficulty: "Difficult")
Workout.create(name: "Reverse Flyes", kind: "Machine", muscles: "Shoulders", difficulty: "Easy")
Workout.create(name: "Standing Front Raise", kind: "Dumbbell", muscles: "Shoulders", difficulty: "Easy")
Workout.create(name: "Standing Lateral Raise", kind: "Dumbbell", muscles: "Shoulders", difficulty: "Easy")
Workout.create(name: "Uptight Rows", kind: "Barbell", muscles: "Shoulders", difficulty: "Moderate")
Workout.create(name: "Standing Front Raise", kind: "Cable", muscles: "Shoulders", difficulty: "Easy")
Workout.create(name: "Standing Lateral Raise", kind: "Cable", muscles: "Shoulders", difficulty: "Easy")

###### TRICEPS TRICEPS TRICEPS TRICEPS TRICEPS TRICEPS TRICEPS TRICEPS TRICEPS TRICEPS TRICEPS TRICEPS ######
###### TRICEPS TRICEPS TRICEPS TRICEPS TRICEPS TRICEPS TRICEPS TRICEPS TRICEPS TRICEPS TRICEPS TRICEPS ######

Workout.create(name: "Seated Triceps Extension", kind: "Dumbbell", muscles: "Triceps", difficulty: "Moderate")
Workout.create(name: "Lying Triceps Extension", kind: "Dumbbell", muscles: "Triceps", difficulty: "Easy")
Workout.create(name: "Lying Triceps Extension", kind: "Body Bar", muscles: "Triceps", difficulty: "Easy")
Workout.create(name: "Seated Triceps Extension", kind: "Dumbbell", muscles: "Triceps", difficulty: "Moderate")
Workout.create(name: "Bench Dips", kind: "Bodyweight", muscles: "Triceps", difficulty: "Moderate")
Workout.create(name: "Triangle Pushups", kind: "Bodyweight", muscles: "Triceps", difficulty: "Difficult")

###### ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ######
###### ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ABS ######

Workout.create(name: "Sit Ups", kind: "Bodyweight", muscles: "Abs", difficulty: "Moderate")
Workout.create(name: "Planks", kind: "Bodyweight", muscles: "Abs", difficulty: "Moderate")
Workout.create(name: "Side Planks", kind: "Bodyweight", muscles: "Abs", difficulty: "Difficult")
Workout.create(name: "Woodchopper", kind: "Cables", muscles: "Abs", difficulty: "Easy")
Workout.create(name: "Leg Raises", kind: "Bodyweight", muscles: "Abs", difficulty: "Moderate")
Workout.create(name: "Knee Raises", kind: "Bodyweight", muscles: "Abs", difficulty: "Easy")
Workout.create(name: "Heel Touches", kind: "Bodyweight", muscles: "Abs", difficulty: "Easy")
Workout.create(name: "Rotations", kind: "Machine", muscles: "Abs", difficulty: "Easy")


puts 'Workouts seeded'