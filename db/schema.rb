# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_05_203027) do
  create_table "exercise_routines", force: :cascade do |t|
    t.integer "routine_id", null: false
    t.integer "workout_id", null: false
    t.integer "sets"
    t.integer "reps"
    t.integer "rest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["routine_id"], name: "index_exercise_routines_on_routine_id"
    t.index ["workout_id"], name: "index_exercise_routines_on_workout_id"
  end

  create_table "exercise_rxes", force: :cascade do |t|
    t.integer "exercise_routine_id", null: false
    t.datetime "date"
    t.float "percent_completed"
    t.boolean "completed"
    t.integer "intensity"
    t.integer "weight"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["exercise_routine_id"], name: "index_exercise_rxes_on_exercise_routine_id"
  end

  create_table "routines", force: :cascade do |t|
    t.string "name"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_routines_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "password_digest"
    t.string "email"
    t.integer "feet"
    t.integer "inches"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "weights", force: :cascade do |t|
    t.integer "user_id", null: false
    t.float "weight"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_weights_on_user_id"
  end

  create_table "workouts", force: :cascade do |t|
    t.string "name"
    t.string "kind"
    t.string "image"
    t.string "muscles"
    t.string "difficulty"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "exercise_routines", "routines"
  add_foreign_key "exercise_routines", "workouts"
  add_foreign_key "exercise_rxes", "exercise_routines"
  add_foreign_key "routines", "users"
  add_foreign_key "weights", "users"
end
