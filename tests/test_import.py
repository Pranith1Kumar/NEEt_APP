def test_import():
    import app
    assert hasattr(app, "app")
