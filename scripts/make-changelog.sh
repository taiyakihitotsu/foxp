#!bash/sh

tag=$1 && \

if [ -z "$tag" ]; then
  echo "empty tag."
  exit 1
fi

if ! git rev-parse "$tag" >/dev/null 2>&1; then
  echo "$tag does not exist."
  exit 1
fi

prev_tag=$(git tag --sort=creatordate | grep -B1 "^$tag$" | head -n1) && \

if [ -z "$prev_tag" ]; then
  echo "empty prev_tag."
  exit 1
fi

out="changelog/${tag}.md"
mkdir -p changelog

{
echo -e "## $tag - $(date +%Y-%m-%d)" >> CHANGELOG.md && \
echo ""
echo "### Contributors"
git log "$prev_tag..$tag" --pretty=format:"%an" | sort | uniq | sed 's/^/- /'
echo ""
echo "### Commits"
git log "$prev_tag..$tag" --pretty=format:"- %s (by %an)"
} > "$out"

echo -e "\033[0;32mchangelog updated\033[0m"
