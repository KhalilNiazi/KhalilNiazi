name: Update Recent Repos

on:
  schedule:
    - cron: '0 * * * *'  # Every hour
  workflow_dispatch:

jobs:
  update-readme:
    runs-on: ubuntu-latest

    steps:
      - name: Update README with recent repositories
        uses: gautamkrishnar/blog-post-workflow@master
        with:
          comment_tag_name: "recent-repos"
          feed_list: "https://github.com/KhalilNiazi/KhalilNiazi/"
          repo_type: "public"
          max_post_count: 6
