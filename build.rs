use std::fmt;
use std::process::Command;

fn die<T : fmt::Debug>(s: &'static str, e: T) -> ! {
  panic!("Error: {}: {:?}", s, e);
}

fn main () {
  let mut child = Command::new("npm")
    .arg("run")
    .arg("build")
    .env("NODE_ENV", "production")
    .current_dir(concat!(env!("CARGO_MANIFEST_DIR"), "/web"))
    .spawn()
    .unwrap_or_else(|e| die("Running command", e));

  println!("Building JS code: Started");
  let code = child.wait().unwrap_or_else(|e| die("Building JS code", e));
  assert!(code.success());
  println!("Building JS code: Finished");
}
