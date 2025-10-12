{
  description = "Type Kana - A Svelte app for learning Japanese Kana";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22
            nodePackages.npm
          ];

          shellHook = ''
            echo "Type Kana development environment"
            echo "Execute:"
            echo " npm install and then run npm run dev"
          '';
        };
      }
    );
}

