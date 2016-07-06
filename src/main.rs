use std::path;

fn main() {
    println!(
      "{}",
      include_str!(concat!(env!("CARGO_MANIFEST_DIR"), "/web/target/index.js"))
    );
}
