for f in ./*.jpg; do
	filename=$(basename "$f")
	mongofiles --db Project put "$filename" --local "$f"
done
