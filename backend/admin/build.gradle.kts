parent?.let {
    group = it.group
    group = it.version
}

dependencies{
    implementation(project(":common"))
    implementation(project(":repository"))
    implementation(springStarter("data-redis"))
}
