#!/bin/bash


generate_csv() {
# Set the path to your images directory
images_directory="$(pwd)/$1"

# Set the path to the output CSV file
output_csv="$1.csv"

# Create the header in the CSV file
echo "FILENAME,IDENTITY" > "$output_csv"

# Iterate over the images in the directory
for image_path in "$images_directory"/*.png; do
    # Get the filename without extension
    filename=$(basename -- "$image_path")
    filename_no_extension="${filename%.*}"

    # Get the identity (file extension truncated)
    identity=$(echo "$filename" | awk -F. '{print $NF}')

    # Append to the CSV file
    echo "$filename, $filename_no_extension" >> "$output_csv"
done

echo "CSV file generated successfully: $output_csv"
}

generate_csv "train"
generate_csv "test"
generate_csv "validate"

