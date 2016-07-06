fn main() {
    println!(
      "{}",
      include_str!(concat!(env!("CARGO_MANIFEST_DIR"), "/web/target/index.js"))
    );
}


#[cfg(test)]
mod tests {
  #[test]
  fn js_tests() {
    use std::process::Command;

    let mut child = Command::new("npm")
      .arg("run")
      .arg("test")
      .current_dir(concat!(env!("CARGO_MANIFEST_DIR"), "/web"))
      .spawn().unwrap();
    println!("Testing JS code: Started");
    let code = child.wait().unwrap();
    println!("Testing JS code: Finished");
    assert!(code.success());
  }
}
