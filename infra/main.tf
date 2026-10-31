resource "cloudflare_pages_project" "manteia" {
  account_id        = var.account_id
  name              = "manteia"
  production_branch = "main"

  build_config = {
    build_command   = "npm run build"
    destination_dir = "dist"
  }

  source = {
    type = "github"
    config = {
      owner     = "Ishikawa847"
      repo_name = "manteia"
    }
  }
}