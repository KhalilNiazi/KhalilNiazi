name: 🔁 Update Recent Repos

on:
  schedule:
    - cron: "0 * * * *"  # Every hour
  workflow_dispatch:

jobs:
  update:
    name: 📝 Update README
    runs-on: ubuntu-latest
    steps:
      - name: Update README with recent GitHub activity
        uses: Readme-Workflows/recent-activity@main
        with:
          GH_USERNAME: "KhalilNiazi"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
