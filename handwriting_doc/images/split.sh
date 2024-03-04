#!/bin/bash

# Set the path to your images directory
images_directory=$(pwd)

# Set the path to the train and test directories
train_directory="$(pwd)/train"
test_directory="$(pwd)/test"

# Create train and test directories if they don't exist
mkdir -p "$train_directory"
mkdir -p "$test_directory"

# Get the total number of images
total_images=$(ls -1 "$images_directory" | wc -l)

# Calculate the number of images for the train set (80%)
train_count=$(echo "$total_images * 0.8" | bc | awk '{print int($1+0.5)}')

# Randomly select images for the train set
shuf -zn "$train_count" -e "$images_directory"/* | xargs -0 mv -t "$train_directory"

# Move the remaining images to the test set
mv "$images_directory"/* "$test_directory"

echo "Images split into train and test sets successfully."

